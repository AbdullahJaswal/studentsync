from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            "title",
            "description",
            "user",
            "event",
        ]  # Add all the fields you want to include


# class EventRequestSerializer(serializers.Serializer):
#     url = serializers.URLField()
