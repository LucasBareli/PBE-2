from django.db import models

class Cadastro(models.Model):
    ni = models.CharField(max_length=15)
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    cel = models.CharField(max_length=255)
    ocup = models.FloatField()
    
class Disciplinas(models.Model):
    disciplina = models.CharField(max_length=50)
    sigla = models.CharField(max_length=5)
    curso = models.CharField(max_length=50)
    semestre = models.CharField(max_length=1)
    carga_horaria = models.FloatField()