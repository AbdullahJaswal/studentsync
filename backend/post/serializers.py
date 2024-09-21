from event.serializers import EventSerializer
from rest_framework import serializers
from user.serializers import UserSerializer

from .models import Comment, Post


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "comment",
            "user",
            "created_at",
        ]
        read_only_fields = ["user"]


class CommentPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "comment",
            "user",
            "post",
            "created_at",
        ]
        read_only_fields = ["user", "post"]


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    event = EventSerializer(read_only=True)

    interested_count = serializers.SerializerMethodField()
    is_interested = serializers.SerializerMethodField()
    interested_users = UserSerializer(many=True, read_only=True)

    def get_interested_count(self, obj):
        return obj.interested_users.count()

    def get_is_interested(self, obj):
        request = self.context.get("request")
        if request:
            return obj.interested_users.filter(id=request.user.id).exists()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "description",
            "event",
            "user",
            "interested_count",
            "interested_users",
            "is_interested",
            "comments",
            "created_at",
        ]
        read_only_fields = ["user"]


class PostCreateSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    interested_count = serializers.SerializerMethodField()

    def get_interested_count(self, obj):
        return obj.interested_users.count()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "description",
            "event",
            "user",
            "interested_count",
            "comments",
            "created_at",
        ]
        read_only_fields = ["user"]
