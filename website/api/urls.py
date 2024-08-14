from django.contrib import admin
from django.urls import path, include
from . import views
from .views import *

# from .views import trigger_error

urlpatterns = [
    path("", views.index),
    path("summarize/", summarizeTrajectories, name="summarize"),
    path("impute/", imputeTrajectories, name="impute"),
    path("generate/", generateTrajectories, name="generate"),
    path("download/", downloadTrajectories, name="download"),
    path("train/", trainNewModel, name="train"),
    path("db/", views.QueryList.as_view(), name="queries"),
]
