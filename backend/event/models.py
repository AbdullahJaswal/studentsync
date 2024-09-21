from django.contrib.auth import get_user_model
from django.db import models


class Event(models.Model):
    uid = models.TextField(primary_key=True)
    title = models.TextField(blank=True, null=False)
    description = models.TextField(blank=True)
    due_date = models.DateField(blank=True, null=True)

    user_calendars = models.ManyToManyField("UserCalendar", related_name="events")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Event"
        verbose_name_plural = "Events"

    def __str__(self):
        return self.uid

    def serialize(self):
        return {
            "uid": self.uid,
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date,
        }


class UserCalendar(models.Model):
    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="calendar",
        null=False,
        blank=False,
    )
    url = models.URLField(blank=False, null=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User Calendar"
        verbose_name_plural = "User Calendars"

        unique_together = [("user", "url")]

    def __str__(self):
        return self.user.email
