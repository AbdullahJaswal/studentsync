from django.db import models
from django.contrib.auth import get_user_model
from event.models import Event


class Post(models.Model):
    title = models.TextField(blank=False, null= False)
    description = models.TextField(blank=True)
    user = models.ForeignKey(get_user_model(), blank=False, null= False, on_delete=models.CASCADE, related_name="user")  # Foreign key to User model
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event")

    interested_users = models.ManyToManyField(get_user_model(), related_name="interested_users")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "user": self.user.serialize(),
            "event": self.event.serialize()
        }
