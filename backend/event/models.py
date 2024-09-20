from django.contrib.auth import get_user_model
from django.db import models


class Event(models.Model):
    uid = models.TextField(primary_key=True)
    title = models.TextField(blank=True, null=False)
    description = models.TextField(blank=True)
    due_date = models.DateField(blank=True, null=True)

    users = models.ManyToManyField(get_user_model(), related_name="events")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.uid

    def serialize(self):
        return {
            "uid": self.uid,
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date,
        }
