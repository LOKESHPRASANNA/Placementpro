package com.placementpro.repository;

import com.placementpro.entity.Task;
import com.placementpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserOrderByCreatedAtAsc(User user);
    long countByUserAndCompletedTrue(User user);
    long countByUser(User user);
}
