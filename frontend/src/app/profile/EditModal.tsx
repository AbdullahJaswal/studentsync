"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const EditModal = ({ section, skills, achievements, onSave, onClose }) => {
  const [editedSkills, setEditedSkills] = useState(skills);
  const [editedAchievements, setEditedAchievements] = useState(achievements);
  const [newSkill, setNewSkill] = useState('');
  const [newAchievement, setNewAchievement] = useState('');

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...editedSkills];
    updatedSkills[index] = value;
    setEditedSkills(updatedSkills);
  };

  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...editedAchievements];
    updatedAchievements[index] = value;
    setEditedAchievements(updatedAchievements);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setEditedSkills([...editedSkills, newSkill]);
      setNewSkill('');
    }
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setEditedAchievements([...editedAchievements, newAchievement]);
      setNewAchievement('');
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = editedSkills.filter((_, i) => i !== index);
    setEditedSkills(updatedSkills);
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = editedAchievements.filter((_, i) => i !== index);
    setEditedAchievements(updatedAchievements);
  };

  const handleSave = () => {
    if (section === 'skills') {
      onSave(editedSkills);
    } else if (section === 'achievements') {
      onSave(editedAchievements);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Edit {section.charAt(0).toUpperCase() + section.slice(1)}</CardTitle>
        </CardHeader>
        <CardContent>
          {section === 'skills' && (
            <>
              {editedSkills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="border rounded p-2 flex-1"
                  />
                  <Button variant="secondary" onClick={() => handleRemoveSkill(index)} className="ml-2">Remove</Button>
                </div>
              ))}
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add new skill"
                  className="border rounded p-2 flex-1"
                />
                <Button variant="primary" onClick={handleAddSkill} className="ml-2">Add</Button>
              </div>
            </>
          )}
          {section === 'achievements' && (
            <>
              {editedAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    className="border rounded p-2 flex-1"
                  />
                  <Button variant="secondary" onClick={() => handleRemoveAchievement(index)} className="ml-2">Remove</Button>
                </div>
              ))}
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="Add new achievement"
                  className="border rounded p-2 flex-1"
                />
                <Button variant="primary" onClick={handleAddAchievement} className="ml-2">Add</Button>
              </div>
            </>
          )}
        </CardContent>
        <div className="flex justify-end p-4">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave} className="ml-2">Save</Button>
        </div>
      </Card>
    </div>
  );
};

export default EditModal;
