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

class Turma(models.Model):
    codigo = models.CharField(max_length=10)
    turma = models.CharField(max_length=5)

class Curso(models.Model):
    codigo = models.CharField(max_length=10)
    curso = models.CharField(max_length=50)
    tipo = models.CharField(max_length=5)
    ha = models.FloatField()
    sigla = models.CharField(max_length=2)

class Ambiente(models.Model):
    codigo = models.CharField(max_length=10)
    sala = models.CharField(max_length=50)
    capacidade = models.FloatField()
    responsavel = models.CharField(max_length=50)
    escolhas = (
        ('M', 'Manhã'),
        ('T', 'Tarde'),
        ('N', 'Noturno'),
        ('S', 'Sabado')
    )
    periodo = models.CharField(max_length=50, choices=escolhas)