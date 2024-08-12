from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from datetime import datetime
from .serializers import QuerySeriazlier
from .models import Query
from rest_framework.decorators import api_view
import os
from django.http import FileResponse, JsonResponse, HttpResponse
import json
import sys

sys.path.append("/speakingTrajectories")
from TrajPipeline.Pipeline.TrajectoryPipeline import *


# Clear Database
Query.objects.all().delete()


def index(request):
    return render(request, "index.html")


class QueryList(generics.ListAPIView):
    queryset = Query.objects.all()
    serializer_class = QuerySeriazlier
    permission_classes = [AllowAny]


@api_view(["POST"])
def summarizeTrajectories(request):
    _filePathInput = "/speakingTrajectories/TrajPipeline/Pipeline/Input/params.json"
    print("Request for Summarizing Trajectories ")
    serializer = QuerySeriazlier(data=request.data)
    if serializer.is_valid():
        serializer.save()
        trajectories_uploaded = request.data.get("trajectoriesUploaded", None)
        _request_id_ = serializer.data["id"]
        _request_type = request.data.get("requestType")
        file_name = f"uploadedTrajs_{_request_id_}_{_request_type}.json"
        _filePathWebsite = f"/speakingTrajectories/GUST-GPT/website/frontend/build/static/media/{file_name}"
        _filePathPipeline = (
            f"/speakingTrajectories/TrajPipeline/Pipeline/Input/{file_name}"
        )
        jsonToSave = {
            "mode": "summarization_testing",
            "city": request.data.get("city", ""),
            "input_path": _filePathPipeline,
        }
        # Put the params.json for the pipeline to run
        with open(_filePathInput, "w") as json_file:
            json.dump(jsonToSave, json_file, indent=4)
        # Input the uploaded trajectories to the pipeline
        if trajectories_uploaded:
            with open(_filePathPipeline, "w") as file:
                json.dump(trajectories_uploaded, file)

        # Now I can run the pipeline
        print("I wrote the reqeust to params.json and passed the uploaded trajectories")
        print("Now I will start the pipeline")
        pipeline = TrajectoryPipeline()
        pipeline.load_params(filepath=_filePathInput)
        pipeline.run_pipeline(
            output_filepath="summarized_trajectories.json",
        )
        print("I returned from the pipeline")

        try:
            json_file_path = "/speakingTrajectories/TrajPipeline/Pipeline/Detokenization/detokenizedTrajectories.json"
            with open(json_file_path, "r") as json_file:
                data = json.load(json_file)

            return JsonResponse({"trajectories": data}, status=201)
        except ValueError as e:
            if str(e) == "iHARPV: Query range or resolution not supported":
                return JsonResponse(
                    {"error": "iHARPV: Query range or resolution not supported"},
                    status=400,
                )
    error = str(serializer.errors)
    return JsonResponse({"error": error}, status=400)


@api_view(["POST"])
def imputeTrajectories(request):
    print("Request for Impute ")
    serializer = QuerySeriazlier(data=request.data)
    if serializer.is_valid():
        serializer.save()
        trajectories_uploaded = request.data.get("trajectoriesUploaded", None)
        _request_id_ = serializer.data["id"]
        _request_type = request.data.get("requestType")
        file_name = f"uploadedTrajs_{_request_id_}_{_request_type}.json"
        _file_path = f"/speakingTrajectories/GUST-GPT/website/frontend/build/static/media/{file_name}"
        if trajectories_uploaded:
            with open(_file_path, "w") as file:
                json.dump(trajectories_uploaded, file)
        try:
            json_file_path = (
                "/speakingTrajectories/GUST-GPT/website/api/assets/trajectories.json"
            )
            with open(json_file_path, "r") as json_file:
                data = json.load(json_file)
            return JsonResponse(data, status=201)
        except ValueError as e:
            if str(e) == "iHARPV: Query range or resolution not supported":
                return JsonResponse(
                    {"error": "iHARPV: Query range or resolution not supported"},
                    status=400,
                )
    error = str(serializer.errors)
    return JsonResponse({"error": error}, status=400)


@api_view(["POST"])
def generateTrajectories(request):
    _filePath = "/speakingTrajectories/TrajPipeline/Pipeline/Input/params.json"
    print("Request for Generating Trajectories ")
    serializer = QuerySeriazlier(data=request.data)
    if serializer.is_valid():
        serializer.save()
        jsonToSave = {
            "mode": "generation_testing",
            "city": request.data.get("city", ""),
            "trajectories_count": str(request.data.get("trajectoriesCount", "")),
            "trajectories_length": str(request.data.get("trajectoriesLength", "")),
        }
        # Save the new JSON to a file

        with open(_filePath, "w") as json_file:
            json.dump(jsonToSave, json_file, indent=4)
        print("I wrote reqeust to params.json")
        print("Now I will start the pipeline")
        pipeline = TrajectoryPipeline()
        pipeline.load_params(filepath=_filePath)
        pipeline.run_pipeline(
            output_filepath="summarized_trajectories.json",
        )
        print("I returned from the pipeline")

        try:
            json_file_path = "/speakingTrajectories/TrajPipeline/Pipeline/Detokenization/detokenizedTrajectories.json"
            with open(json_file_path, "r") as json_file:
                data = json.load(json_file)

            return JsonResponse({"trajectories": data}, status=201)
        except ValueError as e:
            if str(e) == "iHARPV: Query range or resolution not supported":
                return JsonResponse(
                    {"error": "iHARPV: Query range or resolution not supported"},
                    status=400,
                )
    error = str(serializer.errors)
    return JsonResponse({"error": error}, status=400)


@api_view(["POST"])
def downloadTrajectories(request):
    input_filePath = "/speakingTrajectories/TrajPipeline/Pipeline/Detokenization/detokenizedTrajectories.json"
    print("Request for Downloading Data ")
    serializer = QuerySeriazlier(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # jsonToSave = {
        #     "mode": "generation_testing",
        #     "city": request.data.get("city", ""),
        #     "trajectories_count": str(request.data.get("trajectoriesCount", "")),
        #     "trajectories_length": str(request.data.get("trajectoriesLength", "")),
        # }
        # Get the detokenization data to send to the front end
        _request_id_ = serializer.data["id"]
        _file_name = f"download_{_request_id_}.json"
        output_filePath = f"/speakingTrajectories/GUST-GPT/website/frontend/build/static/media/{_file_name}"
        # Open and read the source JSON file
        with open(input_filePath, "r") as source_file:
            data = json.load(source_file)  # Load JSON data
        # Open and write the data to the frontend
        with open(output_filePath, "w") as json_file:
            json.dump(data, json_file)

        return JsonResponse(
            {
                "fileName": _file_name,
            },
            status=201,
        )

    error = str(serializer.errors)
    return JsonResponse({"error": error}, status=400)
