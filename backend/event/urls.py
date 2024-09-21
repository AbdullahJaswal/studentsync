from django.urls import path

from .views import EventView, UserCalendarView

app_name = "event"

urlpatterns = [
    # Event
    path("", EventView.as_view(), name="event-view"),
    # UserCalendar
    path("calendar/", UserCalendarView.as_view(), name="user-calendar-view"),
]
