from django.db import models

# Create your models here.

class LiftName(models.Model):
    name = models.CharField(max_length=100, unique=True)

    # Shows actual lift name for readability
    def __str__(self):
        return self.name

class LiftTemplate(models.Model):
    LiftTemplateId = models.AutoField(primary_key=True)
    # Uses delete on cascade, will remove all instances of lift in LiftTemplate
    # Is linking to automatically created id associated with name in LiftName
    lift_name = models.ForeignKey(LiftName, on_delete=models.CASCADE)  # Use ForeignKey
    sets = models.PositiveIntegerField(default=3)
    reps = models.PositiveIntegerField(default=10)
    weight = models.PositiveIntegerField(default=100)