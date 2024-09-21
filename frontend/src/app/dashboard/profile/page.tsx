"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditModal from "./EditModal";

export default function Profile() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState("");
  const [skills, setSkills] = useState([
    "JavaScript",
    "React",
    "SQL",
    "Data Analysis",
  ]);
  const [achievements, setAchievements] = useState([
    "Dean's List - 2022",
    "Certified Full-Stack Developer",
    "Hackathon Winner - 2023",
  ]);

  const [reviews,setReviews] = useState([
    "John Doe: Rohan is an exceptional team player and has strong technical skills",
"Jane Smith: He was instrumental in leading our project to success",
"Emily Johnson: His problem-solving abilities are outstanding. A pleasure to work with"
  ]);

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setModalOpen(true);
  };

  const handleSave = (updatedValues: string[]) => {
    if (editingSection === "skills") {
      setSkills(updatedValues);
    } else if (editingSection === "achievements") {
      setAchievements(updatedValues);
    }
    else if(editingSection == "reviews"){
      setReviews(updatedValues)
    }
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Profile Card */}
      <Card className="max-w-4xl mx-auto shadow-md rounded-lg">
        <CardHeader className="relative">
          {/* Background */}
          <div className="h-32 bg-gradient-to-r from-teal-400 to-blue-500 rounded-t-lg"></div>
          {/* Profile Picture */}
          <div className="absolute top-16 left-4 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Avatar className="h-24 w-24">
              <AvatarImage src="../img/sampleebike.jpg" />
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="mt-8 p-6">
          <CardTitle className="text-2xl font-semibold">
            Rohan Mhadgut
          </CardTitle>
          <CardDescription className="text-gray-600">MC2037</CardDescription>
          <div className="text-sm text-gray-500 mt-2">
            s3998327@student.rmit.edu.au
          </div>
          <div className="text-blue-600 mt-2">Looking for group member</div>
          {/* Action Buttons */}
          <div className="mt-4 flex space-x-2">
            <Button variant="secondary">Edit Profile</Button>
            <Button variant="secondary">Open to Join Groups</Button>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="max-w-4xl mx-auto shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Skills</CardTitle>
          <Button variant="secondary" onClick={() => handleEdit("skills")}>
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Groups Section */}
      <Card className="max-w-4xl mx-auto shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            <li>Software Engineering Club</li>
            <li>Data Science Community</li>
            <li>Web Developers Network</li>
          </ul>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card className="max-w-4xl mx-auto shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Achievements</CardTitle>
          <Button
            variant="secondary"
            onClick={() => handleEdit("achievements")}
          >
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Card className="max-w-4xl mx-auto shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Reviews</CardTitle>
          <Button
            variant="secondary"
            onClick={() => handleEdit("reviews")}
          >
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            {reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal
          section={editingSection}
          skills={skills}
          achievements={achievements}
          reviews={reviews}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
