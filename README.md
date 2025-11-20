# 🎓 Student Success Predictor  
A lightweight ML-powered web application that predicts a student's academic performance and identifies students who may need support or improvement.

---

## 🚀 Features
- Predict **Pass / Fail / Needs Improvement**
- Simple & clean **Flask API**
- Pre-trained ML model (Random Forest / Logistic Regression)
- Easy-to-use **web UI** for entering student details
- Fast predictions with minimal dependencies

---

## 🛠 Tech Stack
**Python**, **Flask**, **scikit-learn**, **HTML/CSS/JS**

---

## ▶️ How to Run
1. Install dependencies  
   ```
   pip install -r requirements.txt
   ```
2. Start backend server
```
python src/backend/app.py
```

3. Open frontend
```
src1/frontend/index.html
```

🧠 Model Summary

- Trained using: attendance, quiz marks, study hours, engagement, previous GPA
- Output: performance class + confidence score
- Stored in: src/models/model.pkl

📌 Future Improvements

- Add SHAP-based explainability
- Add login & student database
- Deploy on Render / Vercel / AWS

👨‍💻 Team

Team Hawkers
- Anubhab Pradhan
- Rakesh Ranjan
