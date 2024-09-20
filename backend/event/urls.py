from django.urls import path

from .views import EventView

app_name = "event"

urlpatterns = [
    # Event
    path("", EventView.as_view(), name="event-view"),
]
