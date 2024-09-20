from django.urls import path

from .views import DeleteAccount, IcsParser

app_name = "user"

urlpatterns = [
    # User
    path("delete/", DeleteAccount.as_view(), name="delete"),
    path("icsparser/", IcsParser.as_view(), name="icsparser"),
]
