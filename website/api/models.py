from django.db import models
from django.core.validators import MaxValueValidator


class Query(models.Model):
    REQUEST_CHOICES = (
        ("Summarize", "Summarize"),
        ("Impute", "Impute"),
        ("Generate", "Generate"),
        ("Download", "Download"),
        ("Train", "Train"),
    )
    OPERATION_CHOICES = (
        ("Trajectory Classification", "Trajectory Classification"),
        ("Trajectory Generation", "Trajectory Generation"),
        ("Trajectory Imputation", "Trajectory Imputation"),
        ("Trajectory Summarization", "Trajectory Summarization"),
    )
    requestType = models.CharField(max_length=15, choices=REQUEST_CHOICES)
    city = models.CharField(max_length=30)
    trajectoriesCount = models.IntegerField(
        default=0, validators=[MaxValueValidator(100000)]
    )
    trajectoriesLength = models.IntegerField(
        default=0, validators=[MaxValueValidator(1000000)]
    )
    # trajectoriesUploaded = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    operation = models.CharField(max_length=30, choices=OPERATION_CHOICES)
    email = models.EmailField(max_length=254)  # Add this line

    def __str__(self):
        return f"{self.requestType} - {self.city}"
