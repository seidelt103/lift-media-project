from rest_framework import serializers
from LiftTracker.models import LiftName, Workouts, LiftTemplate

class LiftNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiftName
        fields = ['id', 'name']

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workouts
        fields = ['WorkoutId', 'date']
        
class LiftTemplateSerializer(serializers.ModelSerializer):
    # Gives the actual name string from LiftName, read_only makes it not required to POST data for it, only GET (I think) 
    name = serializers.CharField(source='lift_name.name', read_only=True)

    class Meta:
        model=LiftTemplate
        # Must match models fields, name is read only
        fields = ('LiftTemplateId', 'lift_name','name', 'sets', 'reps', 'weight', 'fk_workout')