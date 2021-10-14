const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  let deptValue = req.query.sDept || "";
  let sName = req.query.sName || "";

  const selectQuery = `
    SELECT  A.EMPNO,
            A.ENAME,
            A.JOB,
            DATE_FORMAT(A.HIREDATE, '%Y-%m-%d') AS HIREDATE,
            CONCAT("$", FORMAT(A.SAL, 0))      AS SAL,
            B.DNAME,
            B.LOC
      FROM  EMP           A
     INNER
      JOIN  DEPT          B
        ON  A.DEPTNO = B.DEPTNO
     WHERE  B.DNAME LIKE '${deptValue}%'
       AND  A.ENAME LIKE UPPER('${sName}%') 
     ORDER  By A.EMPNO ASC
  `;

  try {
    db.query(selectQuery, (err, rows) => {
      console.log(rows);

      res.render("screens/emp", { rows });
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

module.exports = router;
