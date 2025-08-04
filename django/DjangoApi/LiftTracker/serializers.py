from rest_framework import serializers
from LiftTracker.models import LiftTemplate

class LiftTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model=LiftTemplate
        fields = ('LiftTemplateId', 'name', 'sets', 'reps', 'weight')