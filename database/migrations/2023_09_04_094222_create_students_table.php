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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('symbol_number')->unique();
            $table->string('imagePath')->nullable()->unique();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('gender');
            $table->string('temporary_address');
            $table->string('permanent_address');
            $table->decimal('scored_gpa', 4, 2); // Decimal with precision 4 and scale 2
            $table->unsignedBigInteger('school_id');
            $table->string('phone_number');
            $table->string('mother_name');
            $table->string('father_name');
            $table->string('mother_phone_number');
            $table->string('father_phone_number');
            $table->string('preferred_school')->nullable();
            $table->string('preferred_school_address')->nullable();
            $table->string('preferred_major')->nullable();
            $table->string('result')->nullable();
            $table->integer('rank')->nullable();
            $table->timestamps();

            // Define the foreign key constraint
            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
