from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from icalendar import Calendar
import requests
from .serializers import EventRequestSerializer, EventSerializer
from .models import Event



# Create your views here.
class IcsParser(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        serializer = EventRequestSerializer(data=request.data)
        if serializer.is_valid():

            ics_url = request.data['url']
            response = requests.get(ics_url)

            if response.status_code == 200:
                ics_content = response.content  # Get the content of the file in bytes

                # Parse the .ics file content using the icalendar library
                calendar = Calendar.from_ical(ics_content)

                items = []
                # Iterate over events in the calendar
                for component in calendar.walk():

                    if component.name == "VEVENT":  # VEVENT represents a calendar event
                        event_uid = component.get('uid')  # Event location
                        event_summary = component.get('summary')  # Event title
                        event_description = component.get('description')  # Event description
                        event_start = component.get('dtstart').dt  # Start date and time

                        event_data = {
                            'summary': event_summary,
                            'due_date': event_start,
                            'description': event_description,
                            'uid': event_uid,
                        }

                        event_serializer = EventSerializer(data=event_data)
                        if event_serializer.is_valid():
                            event = event_serializer.save()
                            items.append(event.serialize())

                return Response(
                    {
                        "message": "Calendar inserted successfully",
                        "items": items,
                    }
                )
            else:
                return Response({"error": "Calendar not found"}, status=404)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):

        events = Event.objects.all()
        events_serialized = [event.serialize() for event in events]

        return Response({
            'success': True,
            'message': 'Calendar Events',
            'data': {
                'events': events_serialized
            }
        })
