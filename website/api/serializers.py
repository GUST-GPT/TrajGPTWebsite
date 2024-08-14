from rest_framework import serializers
from .models import Query


class QuerySeriazlier(serializers.ModelSerializer):
    class Meta:
        model = Query
        fields = [
            "id",
            "created_at",
            "requestType",
            "city",
            "trajectoriesCount",
            "trajectoriesLength",
            # "trajectoriesUploaded",
        ]


class QuerySeriazlier2(serializers.ModelSerializer):
    class Meta:
        model = Query
        fields = [
            "id",
            "created_at",
            "requestType",
            "city",
            "operation",
            "email",
            # "trajectoriesUploaded",
        ]

    # def create(self, validated_data):
    #     # Exclude trajectoriesUploaded from validated_data
    #     validated_data.pop("trajectoriesUploaded", None)
    #     return super().create(validated_data)
