# Generated by Django 3.0.2 on 2020-01-26 12:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dictionary', '0007_auto_20200125_1508'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sentences', to='dictionary.Category'),
        ),
    ]
