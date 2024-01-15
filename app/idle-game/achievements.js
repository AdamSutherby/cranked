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
  },
  {
    id: 4,
    title: "50K",
    description: "Reach 50000 total value.",
    completed: false,
  },
  {
    id: 5,
    title: "500K",
    description: "Reach 500000 total value.",
    completed: false,
  },
  {
    id: 6,
    title: "5M",
    description: "Reach 5000000 total value.",
    completed: false,
  },
  {
    id: 7,
    title: "Blue Fish",
    description: "Catch 10 Blue Fish",
    completed: false,
  },
  {
    id: 8,
    title: "Red Fish",
    description: "Catch 100 Red Fish",
    completed: false,
  },
  {
    id: 9,
    title: "Green Fish",
    description: "Catch 1000 Green Fish",
    completed: false,
  },
  {
    id: 10,
    title: "Yellow Fish",
    description: "Catch 10000 Yellow Fish",
    completed: false,
  },
  {
    id: 11,
    title: "Purple Fish",
    description: "Catch 100000 Purple Fish",
    completed: false,
  },
  {
    id: 12,
    title: "Line Cook",
    description: "Cook 1 Meal",
    completed: false,
  },
  {
    id: 13,
    title: "Chef",
    description: "Cook 10 Meals",
    completed: false,
  },
  {
    id: 14,
    title: "Chefin",
    description: "Cook 100 Meals",
    completed: false,
  },
  {
    id: 15,
    title: "Treed",
    description: "Harvest 1 Tree",
    completed: false,
  },
  {
    id: 16,
    title: "Jack",
    description: "Harvest 10 Trees",
    completed: false,
  },
  {
    id: 17,
    title: "De forest",
    description: "Harvest 100 Trees",
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
