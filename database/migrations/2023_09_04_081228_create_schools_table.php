<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('school_name')->unique();
            $table->string('school_type');
            $table->string('school_email')->unique();
            $table->string('school_phone')->unique();
            $table->string('school_address');
            $table->string('school_category');
            $table->string('established_date');
            $table->string('principal_name');
            $table->string('principal_email');
            $table->string('principal_phone');
            $table->string('school_license');
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
