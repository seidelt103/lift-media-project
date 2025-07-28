from rest_framework import serializers
from LiftTracker.models import LiftTemplate

class LiftTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model=LiftTemplate
        fields = ('LiftTemplateId', 'name', 'description', 'created_at', 'updated_at', 'sets', 'reps')