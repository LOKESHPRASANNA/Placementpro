package com.placementpro.repository;

import com.placementpro.entity.Roadmap;
import com.placementpro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    List<Roadmap> findByUserOrderByGeneratedAtDesc(User user);
}
