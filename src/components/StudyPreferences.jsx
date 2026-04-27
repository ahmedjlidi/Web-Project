import React from "react";

function StudyPreferences({
  sessionLength,
  setSessionLength,
  studyTime,
  setStudyTime,
  accuracy,
  setAccuracy,
  getAccuracyLabel,
}) {
  return (
    <div className="section">
      <h3>Study Preferences</h3>

      <div className="form-group">
        <label>
          Session Length: {sessionLength} min (
          {(sessionLength / 60).toFixed(1)} hrs)
        </label>
        <input
          type="range"
          min="5"
          max="180"
          step="5"
          value={sessionLength}
          onChange={(e) => setSessionLength(Number(e.target.value))}
          className="slider"
        />
      </div>

      <div className="form-group">
        <label>Daily Study Time: {studyTime} hours</label>
        <input
          type="range"
          min="1"
          max="8"
          step="1"
          value={studyTime}
          onChange={(e) => setStudyTime(Number(e.target.value))}
          className="slider"
        />
      </div>

      <div className="form-group">
        <label>
          Time Estimation Accuracy: {getAccuracyLabel()}
        </label>
        <input
          type="range"
          min="1"
          max="3"
          step="1"
          value={accuracy}
          onChange={(e) => setAccuracy(Number(e.target.value))}
          className="slider"
        />
      </div>
    </div>
  );
}

export default StudyPreferences;