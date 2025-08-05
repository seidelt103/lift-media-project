from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from LiftTracker.models import LiftTemplate
from LiftTracker.serializers import LiftTemplateSerializer

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
    elif request.method=='POST':
        liftTemplate_data = JSONParser().parse(request)
        liftTemplate_serializer = LiftTemplateSerializer(data=liftTemplate_data)

        if liftTemplate_serializer.is_valid():
            liftTemplate_serializer.save()

            return JsonResponse("Added Successfully", safe=False)
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