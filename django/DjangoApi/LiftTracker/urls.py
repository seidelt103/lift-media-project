from django.urls import re_path
from LiftTracker import views

# Above import is modified from YouTube video, original url import was deprecated, comments said to use
# re_path instead

# Defines which URLs Django should match and what view functions to call when those URLs are hit
urlpatterns = [
    re_path(r'liftTemplate$', views.liftTemplateApi),
    # Gets id for delete (and maybe update too), acts on a singlet item by ID
    re_path(r'^liftTemplate/([0-9]+)$', views.liftTemplateApi),
    re_path(r'^liftnames$', views.liftNameApi),
    re_path(r'^workouts$', views.WorkoutsApi),
    re_path(r'^workouts/([0-9]+)/$', views.WorkoutsApi), 
]