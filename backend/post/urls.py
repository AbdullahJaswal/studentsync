from django.urls import path

from .views import CreatePostView

app_name = "post"

urlpatterns = [
    path("create", CreatePostView.as_view(), name="post-create"),
]
