const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const { Student, Mark, connectDB } = require("./db");
const dotenv = require('dotenv')
dotenv.config()



const app = express();

const PORT = process.env.PORT || 8000
const IP = process.env.HOST



app.use(bodyParser.json());
app.use(cors())

// Connect to DB
connectDB();



// Create Student with Marks
app.post("/students", async (req, res) => {
  const { name, email, age, marks } = req.body;
  try {
    const student = await Student.create(
      { name, email, age, marks },
      { include: ["marks"] }
    );
    res.status(201).json({ message: "Student created successfully", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Get all students (pagination)
app.get("/students", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Student.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    res.json({ total: count, page, limit, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Get student by ID with marks
app.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByPk(id, {
      include: { model: Mark, as: "marks", attributes: ["subject", "score"] },
    });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student
app.put("/students/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, age, marks } = req.body;

  try {
    // Update student basic info
    const [updated] = await Student.update(
      { name, email, age },
      { where: { id } }
    );
    if (!updated) return res.status(404).json({ message: "Student not found" });

    // If marks are provided, update them
    if (marks && Array.isArray(marks)) {
      // Delete old marks first
      await Mark.destroy({ where: { studentId: id } });

      // Insert new marks
      for (const mark of marks) {
        await Mark.create({
          studentId: id,
          subject: mark.subject,
          score: mark.score,
        });
      }
    }

    res.json({ message: "Student and marks updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student
app.delete("/students/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Student.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, IP, () => {
  console.log(` Server running on http://${IP}:${PORT}`);
});
