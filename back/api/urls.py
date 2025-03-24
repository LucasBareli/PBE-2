from django.urls import path
from . import views
from .views import listar_professores, ProfessoresView, ProfessoresDetailView, DisciplinasView, DisciplinasAPIView, TurmaView, TurmaAPIView,CursoView, CursoAPIView, AmbienteView, AmbienteAPIView
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
    path('disciplinas', DisciplinasView.as_view()),
    path('disciplinas/<int:pk>', DisciplinasAPIView.as_view()),
    path('turmas', TurmaView.as_view()),
    path('turmas/<int:pk>', TurmaAPIView.as_view()),
    path('cursos', CursoView.as_view()),
    path('cursos/<int:pk>', CursoAPIView.as_view()),
    path('ambientes', AmbienteView.as_view()),
    path('ambientes/<int:pk>', AmbienteAPIView.as_view())
]
