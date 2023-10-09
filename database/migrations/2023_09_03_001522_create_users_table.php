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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('phone_number')->unique();
            $table->timestamp('phone_verified_at')->nullable();
            $table->string('password');
            $table->unsignedBigInteger('role_id'); // Add the foreign key column
            $table->timestamps();

            // Define the foreign key constraint
            $table->foreign('role_id')->references('id')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop the foreign key constraint
            $table->dropForeign(['role_id']);
        });

        Schema::dropIfExists('users');
    }
};
