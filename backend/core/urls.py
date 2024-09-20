"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os

from dj_rest_auth.views import PasswordResetConfirmView, PasswordResetView
from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .socials import GoogleLogin


class HealthView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(status=200)


url_prefix = "backend-api/" if settings.DEBUG is False else ""

urlpatterns = [
    # Health Check
    path(f"{url_prefix}", HealthView.as_view(), name="health"),

    # Admin
    path(
        f"{url_prefix}adminofthissite/" if settings.DEBUG is False else "admin/",
        admin.site.urls,
    ),

    # Auth
    path(f"{url_prefix}auth/", include("dj_rest_auth.urls")),
    path(f"{url_prefix}auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        f"{url_prefix}auth/password/reset/",
        PasswordResetView.as_view(),
        name="password_reset",
    ),
    path(
        f"{url_prefix}auth/password/reset/confirm/<slug:uid>/<slug:token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(f"{url_prefix}auth/google/", GoogleLogin.as_view(), name="google_login"),
    re_path(r"^accounts/", include("allauth.urls"), name="socialaccount_signup"),

    # Apps
    path(f"{url_prefix}user/", include("user.urls")),
    path(f"{url_prefix}event/", include("event.urls")),
]

if settings.DEBUG is True:
    from drf_yasg import openapi
    from drf_yasg.views import get_schema_view
    from rest_framework import permissions

    schema_view = get_schema_view(
        openapi.Info(
            title=os.environ.get("APP_TITLE"),
            default_version='v1',
            license=openapi.License(name="BSD License"),
        ),
        public=True,
        permission_classes=[permissions.AllowAny],
    )

    urlpatterns.extend(
        [
            path("__debug__/", include("debug_toolbar.urls")),
            path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
            path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
            path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
        ]
    )
