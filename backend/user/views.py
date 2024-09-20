from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from icalendar import Calendar
import requests



import os



# Create your views here.
class DeleteAccount(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        user.delete()

        return Response(
            {"result": "user deleted"},
            status=status.HTTP_200_OK,
        )



class IcsParser(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):

        # URL of the .ics file
        ics_url = "https://rmit.instructure.com/feeds/calendars/user_0WHS7eIOkytMxUipuLgdy362zoukT6kk3Kp13dvr.ics"

        response = requests.get(ics_url)


        if response.status_code == 200:
            ics_content = response.content  # Get the content of the file in bytes

            # Parse the .ics file content using the icalendar library
            calendar = Calendar.from_ical(ics_content)

            items = []
            # Iterate over events in the calendar
            for component in calendar.walk():

                print(component.items())

                if component.name == "VEVENT":  # VEVENT represents a calendar event
                    event_summary = component.get('summary')  # Event title
                    event_start = component.get('dtstart').dt  # Start date and time
                    event_end = component.get('dtend').dt if component.get('dtend') is not None else "N/A"   # End date and time
                    event_description = component.get('description')  # Event description
                    # event_location = component.get('location')  # Event location

                    items.append({
                        'event_summary': event_summary,
                        'event_start': event_start,
                        'event_end': event_end,
                        'event_description': event_description,
                    })

                    print(f"Component: {component.name}")

            return Response(
                {
                    "message": "File read successfully",
                    "items": items,
                }
            )
        else:
            return Response({"error": "File not found"}, status=404)

