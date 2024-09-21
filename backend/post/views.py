from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from .serializers import PostSerializer




# Create your views here.
class CreatePostView(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request):

        try:
            request_data = request.data
            request_data['user'] = 1

            post_serializer = PostSerializer(data=request_data)

            if(not post_serializer.is_valid()):
                return Response(
                    {"error": post_serializer.errors},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )


            post = post_serializer.save()



            return Response({
                "success": True,
                "data": {
                    "post": post
                }
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": str(e)
            })

