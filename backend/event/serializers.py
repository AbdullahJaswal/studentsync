from rest_framework import serializers

from .models import Event, UserCalendar


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "uid",
            "title",
            "description",
            "due_date",
        ]  # Add all the fields you want to include

    def validate(self, attrs):
        # Perform custom validation for non-saved fields
        uid = attrs.get("uid")

        if Event.objects.filter(uid=uid).exists():
            raise serializers.ValidationError(
                {"uid": "Event with this UID already exists."}
            )

        return attrs


class EventRequestSerializer(serializers.Serializer):
    url = serializers.URLField()


class UserCalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCalendar
        fields = [
            "url",
        ]
