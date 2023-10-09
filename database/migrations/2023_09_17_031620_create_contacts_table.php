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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('phone');
            $table->string('email');
            $table->string('location');
            $table->string('facebook_link')->nullable();
            $table->string('twitter_link')->nullable();
            $table->string('github_link')->nullable();
            $table->string('youtube_link')->nullable();
            $table->string('tiktok_link')->nullable();
            $table->string('instagram_link')->nullable();
            $table->boolean('allow_send_message');
            $table->timestamps();
        });

        // Insert a default row with a specific primary key value
        DB::table('contacts')->insert([
            'id' => 1, // Set a specific primary key value (e.g., 1)
            'phone' => '487384738',
            'email' => 'imana@gmail.com',
            'location' => 'Itahari-1',
            'allow_send_message' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
