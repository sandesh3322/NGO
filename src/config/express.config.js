const express = require("express")
const cors = require("cors")
const router = require('./router.config');
require("./db.config");
const { MulterError } = require('multer');

const app = express()

// Middlewares

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    result: null,
    message: "resource not found",
    meta: null
  })
})

// Global error handler (basic)
app.use((error, req, res, next) => {
  console.error(error)
  res.status(error.status || 500).json({
    result: null,
    message: error.message || "server error",
    meta: null
  })
})

app.use((error,req,res,next)=>{

    console.log("Error::::", error);
    let statusCode = error.status || 500 ; 
    let message = error.message || "server error..."
    let detail = error.detail || null;
    


    // mongo db unique error handling 
    if(error.code == 11000){
      const uniqueFailedKeys = Object.keys(error.keyPattern)
      detail = {};
      message = "validation failed";

      uniqueFailedKeys.map((field)=>{
          detail[field] = field+'should be unique'
      })
      statusCode = 400
  }
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = "Validation error";
    detail = {};
    for (let field in error.errors) {
        detail[field] = error.errors[field].message;  // Mongoose provides the message for each invalid field
    }
}

    //  handle multer error
    if(error instanceof MulterError){
      if(error.code === "LIMIT_FILE_SIZE"){
        statusCode = 400
        detail = {
          [error.field]:"file size too large"
        }
      }
    }
    res.status(statusCode).json({
       result: detail,
       message: message,
       meta:null
    })

})


module.exports = app;
