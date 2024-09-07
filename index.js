import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// ตัวแปรเก็บรายการ To-Do
const listItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// หน้าแรก: แสดงรายการทั้งหมด
app.get("/", (req, res) => {
  res.render("index.ejs", { addlist: listItems });
});

// เพิ่มรายการใหม่ (POST)
app.post("/submit", (req, res) => {
  const newItem = req.body["list"];

  if (newItem) {
    listItems.push(newItem); // เพิ่มรายการใหม่เข้าใน list
  }

  res.redirect("/"); // redirect กลับหน้าแรกหลังเพิ่มรายการ
});

// ลบรายการ (DELETE)
app.post("/delete", (req, res) => {
  const itemToDelete = req.body.item; // ได้ค่า item ที่ต้องการลบจากฟอร์ม หรือ req.body["item"] ก็ได้

  // ลบรายการออกจาก listItems
  const index = listItems.indexOf(itemToDelete);
  if (index > -1) {
    listItems.splice(index, 1); // ลบรายการที่ตรงกัน
  }

  res.redirect("/"); // redirect กลับหน้าแรกหลังลบรายการ
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
