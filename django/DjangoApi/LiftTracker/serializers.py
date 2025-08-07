from rest_framework import serializers
from LiftTracker.models import LiftName, LiftTemplate

class LiftNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiftName
        fields = ['id', 'name']
        
class LiftTemplateSerializer(serializers.ModelSerializer):
    # Gives the actual name string from LiftName 
    name = serializers.CharField(source='lift_name.name', read_only=True)

    class Meta:
        model=LiftTemplate
        fields = ('LiftTemplateId', 'lift_name','name', 'sets', 'reps', 'weight')