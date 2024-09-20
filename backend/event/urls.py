from django.urls import path

from .views import IcsParser

app_name = "event"

urlpatterns = [
    # Event
    path("icsparser/", IcsParser.as_view(), name="icsparser"),
]
