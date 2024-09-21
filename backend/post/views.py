from event.models import Event
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Comment, Post
from .serializers import (
    CommentPostSerializer,
    CommentSerializer,
    PostSerializer,
    PostCreateSerializer,
)


# Create your views here.
class PostListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        events_ids = Event.objects.filter(
            user_calendars__user=self.request.user
        ).values_list("uid", flat=True)

        return (
            Post.objects.filter(event__uid__in=events_ids)
            .prefetch_related("comments", "interested_users")
            .order_by("-created_at")
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return PostCreateSerializer
        return PostSerializer


class CommentListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs.get("post_id")
        return Comment.objects.filter(post_id=post_id).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, post_id=self.kwargs.get("post_id"))

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CommentPostSerializer
        return CommentSerializer


class AddPostInterestView(APIView):
    """
    post: Add interest to a post
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        post_id = kwargs.get("post_id")
        post = Post.objects.get(id=post_id)

        if post.user == self.request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        events_ids = Event.objects.filter(
            user_calendars__user=self.request.user
        ).values_list("uid", flat=True)

        if post.event.uid in events_ids:
            if self.request.user not in post.interested_users.all():
                post.interested_users.add(self.request.user)
            else:
                post.interested_users.remove(self.request.user)

            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_403_FORBIDDEN)
