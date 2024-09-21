from django.urls import path

from .views import EventView, EventUserView

app_name = "event"

urlpatterns = [
    # Event
    path("", EventView.as_view(), name="event-view"),
    path("user", EventUserView.as_view(), name="event-user-view"),
]
