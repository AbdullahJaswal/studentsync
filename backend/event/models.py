from django.db import models


class Event(models.Model):
    uid = models.TextField(primary_key=True)
    summary = models.TextField(blank=True)
    description = models.TextField(blank=True)
    due_date = models.DateField(blank=True)

    def __str__(self):
        return self.uid

    def serialize(self):
        return {
            "uid": self.uid,
            "summary": self.summary,
            "description": self.description,
            "due_date": self.due_date,
        }
