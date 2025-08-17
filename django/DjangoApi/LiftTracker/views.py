from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from LiftTracker.models import LiftName, Workouts, LiftTemplate
from LiftTracker.serializers import LiftNameSerializer, WorkoutSerializer, LiftTemplateSerializer

# Create your views here.

@csrf_exempt
def liftTemplateApi(request, id=0):
    # Retrieving data
    if request.method=='GET':
        # Orders lifts table by LiftTemplateId
        liftTemplate = liftTemplate = LiftTemplate.objects.all().order_by('LiftTemplateId')
        liftTemplate_serializer = LiftTemplateSerializer(liftTemplate, many=True)

        return JsonResponse(liftTemplate_serializer.data, safe=False)
    
    # Inserting data
    elif request.method == 'POST':
        liftTemplate_data = JSONParser().parse(request)
        print("Received data:", liftTemplate_data)
        liftTemplate_serializer = LiftTemplateSerializer(data=liftTemplate_data)

        if liftTemplate_serializer.is_valid():
            liftTemplate_serializer.save()
            return JsonResponse("Added Successfully", safe=False)

        print("Serializer errors:", liftTemplate_serializer.errors)
        return JsonResponse("Failed to Add", safe=False)
    
    # Updating existing data
    elif request.method=='PUT':
        liftTemplate_data=JSONParser().parse(request)
        # Attempting to get PK id from Lift Template table
        liftTemplate = LiftTemplate.objects.get(LiftTemplateId = liftTemplate_data['LiftTemplateId'])
        liftTemplate_serializer = LiftTemplateSerializer(liftTemplate, data = liftTemplate_data)

        if liftTemplate_serializer.is_valid():
            liftTemplate_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    
    # Deleting existing data
    elif request.method=='DELETE':
        # References id passed into this overall function
        liftTemplate = LiftTemplate.objects.get(LiftTemplateId = id)
        liftTemplate.delete()

        return JsonResponse("Deleted Successfully", safe=False)

    
@csrf_exempt
def liftNameApi(request):
    if request.method == 'GET':
        lift_names = LiftName.objects.all().order_by('name')
        lift_names_serializer = LiftNameSerializer(lift_names, many=True)
        return JsonResponse(lift_names_serializer.data, safe=False)
    
@csrf_exempt
def WorkoutsApi(request):
    if request.method == 'GET':
        workoutIDs = Workouts.objects.all().order_by('WorkoutId')
        workoutIDs_serializer = WorkoutSerializer(workoutIDs, many=True)
        return JsonResponse(workoutIDs_serializer.data, safe=False)
    
    # Updating existing data
    elif request.method=='PUT':
        workouts_data=JSONParser().parse(request)
        # Attempting to get PK id from Workouts table
        workouts = Workouts.objects.get(WorkoutId = workouts_data['WorkoutId'])
        workouts_serializer = WorkoutSerializer(workouts, data = workouts_data)

        if workouts_serializer.is_valid():
            workouts_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")