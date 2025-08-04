from django.db import models

# Create your models here.

class LiftTemplate(models.Model):
    LiftTemplateId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    sets = models.PositiveIntegerField(default=3)
    reps = models.PositiveIntegerField(default=10)
    weight = models.PositiveIntegerField(default=100)