from django.urls import path

from .views import AddPostInterestView, CommentListCreateView, PostListCreateView

app_name = "post"

urlpatterns = [
    path("", PostListCreateView.as_view(), name="post-list-create-view"),
    path(
        "<int:post_id>/comment/",
        CommentListCreateView.as_view(),
        name="comment-list-create-view",
    ),
    path(
        "<int:post_id>/interest/",
        AddPostInterestView.as_view(),
        name="add-post-interest-view",
    ),
]
