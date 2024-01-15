"use client";

import React, { useState } from 'react';
import './achievements.css'; // Create a CSS file for styling

const achievementData = [
  {
    id: 1,
    title: "Free",
    description: "Purchase the Achievement Page from the shop.",
    completed: false,
  },
  {
    id: 2,
    title: "500",
    description: "Reach 500 total value.",
    completed: false,
  },
  {
    id: 3,
    title: "5K",
    description: "Reach 5000 total value.",
    completed: false,
  }
];

const Achievements = ({ isVisible, onClose }) => {
  const [hoveredAchievement, setHoveredAchievement] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredAchievement(id);
  };

  const handleMouseLeave = () => {
    setHoveredAchievement(null);
  };

  const renderAchievements = () => {
    let prevAchievementCompleted = true;

    return achievementData.map((achievement, index) => {
      const tooltipText = prevAchievementCompleted ? achievement.description : '???';
      prevAchievementCompleted = achievement.completed;

      return (
        <div
          key={achievement.id}
          className={`achievement-box ${achievement.completed ? 'completed' : ''}`}
          onMouseEnter={() => handleMouseEnter(achievement.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="achievement-title">
            {achievement.completed ? (
              achievement.title
            ) : (
              '???'
            )}
            {hoveredAchievement === achievement.id && (
              <div className="tooltip">{tooltipText}</div>
            )}
          </div>
        </div>
      );
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="achievements-overlay" onClick={onClose}>
      <div className="achievements-container">
        <div className="achievements-grid">{renderAchievements()}</div>
      </div>
    </div>
  );
};

export default Achievements;
export { achievementData };
