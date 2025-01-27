from django.urls import path
from . import views
from .views import listar_professores, ProfessoresView, ProfessoresDetailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('id/<int:pk>', ProfessoresDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
